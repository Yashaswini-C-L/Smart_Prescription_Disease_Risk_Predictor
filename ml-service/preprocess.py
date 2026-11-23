# Dataset preprocessing helper
# Maintained by Member 4 (member-4-ml-roadmap)
import pandas as pd
import numpy as np

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Preprocess and clean the raw disease dataset."""
    return df.dropna()
