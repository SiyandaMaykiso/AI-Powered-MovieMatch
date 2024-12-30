import pandas as pd

# Paths to your data
movies_path = "data/ml-latest-small/moviesupdated.csv"
ratings_path = "data/ml-latest-small/ratingsupdated.csv"

# Load datasets
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)

# Display the first few rows of the data
print("Movies Dataset:")
print(movies.head())

print("\nRatings Dataset:")
print(ratings.head())