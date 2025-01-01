import pandas as pd  # type: ignore
import os

# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Paths to the input files
ratings_path = os.path.join(current_dir, "../data/ml-latest-small/ratingsupdated.csv")
movies_path = os.path.join(current_dir, "../data/ml-latest-small/moviesupdated.csv")

# Path to save the combined dataset
output_path = os.path.join(current_dir, "../data/ml-latest-small/user_movie_table.csv")

# Step 1: Load the datasets
print("Loading movies and ratings datasets...")
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)

# Step 2: Merge the datasets on 'movie_id'
print("Merging datasets...")
combined_data = pd.merge(ratings, movies, on="movie_id", how="inner")

# Step 3: Save the combined dataset to a new CSV file
print(f"Saving combined data to {output_path}...")
combined_data.to_csv(output_path, index=False)

# Debugging: Display the first few rows of the combined data
print("Combined dataset preview:")
print(combined_data.head())

print("Process completed successfully!")