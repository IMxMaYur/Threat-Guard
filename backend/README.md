# AI Threat Detection Backend

Python Flask backend for the AI-Based Insider Threat Detection System.

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Add your pre-trained models to the `models/` folder:
   - `isolation_forest.pkl`
   - `autoencoder.keras`
   - `scaler.pkl`

3. Run the server:
\`\`\`bash
python app.py
\`\`\`

The server will start on `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/upload` - Upload log file
- `POST /api/extract-features` - Extract features from logs
- `POST /api/detect` - Run anomaly detection
- `POST /api/generate-reports` - Generate visualization reports
- `GET /api/download/<file_type>` - Download specific file
- `GET /api/status` - Get current processing status
- `POST /api/reset` - Reset state and clean up files

## Folder Structure

- `uploads/` - Temporary storage for uploaded log files
- `processed/` - Temporary storage for extracted features
- `results/` - Temporary storage for detection results and visualizations
- `models/` - Pre-trained ML models (add manually)
- `utils/` - Utility functions for processing

## Notes

- All data in `uploads/`, `processed/`, and `results/` folders is temporary and cleared on server restart
- Make sure to add your pre-trained models before running detection
- The backend uses Flask development server - for production, use a WSGI server like Gunicorn
