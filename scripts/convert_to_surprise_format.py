import pandas as pd  # For data manipulation
from surprise import Dataset, Reader  # For model training

# Path to your combined dataset
dataset_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/user_movie_table.csv"

# Step 1: Load the dataset
print("Loading user-movie dataset...")
data = pd.read_csv(dataset_path)
print("Data loaded successfully!")
print(data.head())

# Step 2: Define the schema for scikit-surprise
# Define the range of ratings (adjust this if your dataset has different scales)
reader = Reader(rating_scale=(0.5, 5.0))  

# Step 3: Convert the dataset for scikit-surprise
print("Converting data for scikit-surprise...")
# Ensure the dataset has the required columns: user_id, movie_id, and rating
surprise_data = Dataset.load_from_df(data[["user_id", "movie_id", "rating"]], reader)
print("Data successfully converted!")

# Debugging: Print confirmation of data conversion
print("Data preparation for scikit-surprise is complete!")