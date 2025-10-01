# Earthquake Prediction System using Machine Learning

This repository contains an Earthquake Prediction System powered by Machine Learning. Follow the steps below to set up and run the project locally.

## Steps to Run the Project

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/ashikurrafi/Earthquake-Prediction-System-using-Machine-Learning.git
```

### 2. Set up the Client Side

Navigate to the `client` folder and install the necessary dependencies:

```bash
cd client
bun i
bun run dev
```

This will set up the client environment and run the development server.

### 3. Set up the Machine Learning Environment

Navigate to the `ml` folder to set up the Python environment:

```bash
cd ml
conda create --name <envname> python=3.10
conda activate <envname>
pip install uv
pip install -r requirements.txt
```

This will create a new conda environment, activate it, and install the required dependencies for running the machine learning models.

### 4. Run the Jupyter Notebook

Open the `eqp.ipynb` Jupyter notebook and execute all the cells to run the machine learning code and models.

```bash
jupyter notebook eqp.ipynb
```

### 5. Set up the Server Side

Go to the `server` folder and copy the model files (`.h5` and `.pkl`) into the folder.

Then, in the same environment, run the server application:

```bash
cd server
python app.py
```

This will start the server and make the Earthquake Prediction System accessible.

---

Now, you should be able to access the system both from the client side and interact with the server-side API.
