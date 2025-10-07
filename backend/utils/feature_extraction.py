import pandas as pd
import numpy as np
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

def extract_features(input_csv_path, output_csv_path):
    """
    Extract features from raw log data for unsupervised anomaly detection.
    
    Expected input columns: user, timestamp, action, resource, status, file_size, etc.
    
    Returns statistics about the extraction process.
    """
    try:
        # Read raw logs
        df = pd.read_csv(input_csv_path)
        
        # Ensure required columns exist
        required_cols = ['user']
        if not all(col in df.columns for col in required_cols):
            raise ValueError(f"Input CSV must contain at least: {required_cols}")
        
        # Convert timestamp if exists
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
            df['hour'] = df['timestamp'].dt.hour
        
        # Group by user and extract features
        user_features = []
        
        for user in df['user'].unique():
            user_df = df[df['user'] == user]
            
            # Initialize features with exact column names
            features = {
                'user': user,
                'total_events': len(user_df),
                'unique_event_types': 0,
                'unique_actions': 0,
                'avg_file_size': 0.0,
                'max_file_size': 0.0,
                'success_rate': 0.0,
                'offhour_activity_ratio': 0.0,
                'failed_actions': 0,
                'file_actions': 0,
                'email_actions': 0,
                'logon_actions': 0,
                'logoff_actions': 0
            }
            
            # Event types
            if 'event_type' in df.columns:
                features['unique_event_types'] = user_df['event_type'].nunique()
            
            # Action-based features
            if 'action' in df.columns:
                features['unique_actions'] = user_df['action'].nunique()
                action_lower = user_df['action'].str.lower()
                
                # Count specific action types
                features['file_actions'] = action_lower.str.contains('file', na=False).sum()
                features['email_actions'] = action_lower.str.contains('email', na=False).sum()
                features['logon_actions'] = action_lower.str.contains('logon|login', na=False).sum()
                features['logoff_actions'] = action_lower.str.contains('logoff|logout', na=False).sum()
            
            # File size features
            if 'file_size' in df.columns:
                file_sizes = user_df['file_size'].dropna()
                if len(file_sizes) > 0:
                    features['avg_file_size'] = float(file_sizes.mean())
                    features['max_file_size'] = float(file_sizes.max())
            
            # Success rate
            if 'status' in df.columns:
                success_count = (user_df['status'].str.lower() == 'success').sum()
                features['success_rate'] = float(success_count / len(user_df)) if len(user_df) > 0 else 0.0
                features['failed_actions'] = len(user_df) - success_count
            
            # Off-hour activity ratio
            if 'timestamp' in df.columns and 'hour' in user_df.columns:
                offhour_count = len(user_df[(user_df['hour'] < 6) | (user_df['hour'] > 18)])
                features['offhour_activity_ratio'] = float(offhour_count / len(user_df)) if len(user_df) > 0 else 0.0
            
            user_features.append(features)
        
        # Create DataFrame with exact column order
        column_order = [
            'user', 'total_events', 'unique_event_types', 'unique_actions',
            'avg_file_size', 'max_file_size', 'success_rate', 'offhour_activity_ratio',
            'failed_actions', 'file_actions', 'email_actions', 'logon_actions', 'logoff_actions'
        ]
        
        features_df = pd.DataFrame(user_features)
        features_df = features_df[column_order]
        
        # Save to CSV
        features_df.to_csv(output_csv_path, index=False)
        
        # Calculate statistics
        stats = {
            'total_users': len(features_df),
            'total_logs_processed': len(df),
            'features_extracted': len(column_order) - 1,
            'feature_names': column_order[1:],
            'date_range': {
                'start': df['timestamp'].min().isoformat() if 'timestamp' in df.columns else None,
                'end': df['timestamp'].max().isoformat() if 'timestamp' in df.columns else None
            }
        }
        
        return stats
        
    except Exception as e:
        raise Exception(f"Feature extraction failed: {str(e)}")
