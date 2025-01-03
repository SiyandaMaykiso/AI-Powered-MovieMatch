from fastapi import FastAPI, HTTPException
import pandas as pd
import random

app = FastAPI()

# Path to the questionnaire movies file
questionnaire_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/questionnaire_movies.csv"

@app.get("/questionnaire")
def get_questionnaire():
    try:
        # Load the questionnaire data
        questionnaire = pd.read_csv(questionnaire_path)
        
        # Randomly select 10 movies (adjustable)
        movies_to_rate = questionnaire.sample(n=10).to_dict(orient="records")
        return {"movies": movies_to_rate}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading questionnaire: {str(e)}")