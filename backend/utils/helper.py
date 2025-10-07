import os
import shutil
from pathlib import Path

def allowed_file(filename, allowed_extensions):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def get_file_size(filepath):
    """Get file size in human-readable format"""
    size_bytes = os.path.getsize(filepath)
    
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    
    return f"{size_bytes:.2f} TB"

def cleanup_temp_folders(folders):
    """Clean up temporary folders by removing all files inside"""
    for folder in folders:
        if os.path.exists(folder):
            for filename in os.listdir(folder):
                file_path = os.path.join(folder, filename)
                try:
                    if os.path.isfile(file_path) or os.path.islink(file_path):
                        os.unlink(file_path)
                    elif os.path.isdir(file_path):
                        shutil.rmtree(file_path)
                except Exception as e:
                    print(f'Failed to delete {file_path}. Reason: {e}')

def ensure_folder_exists(folder_path):
    """Ensure a folder exists, create if it doesn't"""
    Path(folder_path).mkdir(parents=True, exist_ok=True)

def get_all_files_in_folder(folder_path):
    """Get list of all files in a folder with their metadata"""
    files = []
    
    if not os.path.exists(folder_path):
        return files
    
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        if os.path.isfile(file_path):
            files.append({
                'name': filename,
                'path': file_path,
                'size': get_file_size(file_path),
                'extension': filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
            })
    
    return files
