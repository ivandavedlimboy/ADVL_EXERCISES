import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define types
type Exercise = {
    key: string;
    note: string;
    content: string;
};

type State = {
    exercises: Exercise[];
    selected: string | null;
};

type Action =
    | { type: "TOGGLE_SELECT"; payload: string }
    | { type: "UPDATE_CONTENT"; payload: { key: string; newContent: string } };

// Initial exercises
const initialExercises: Exercise[] = [
    { key: "1", note: "Exercise 1", content: `<strong><p>React-Native introduction</p></strong>
    <ul>
    <li>Create a React-Native window in Visual Code</li>
    <li>Input full name in the display</li>
    </ul>
    <p>STATUS: COMPLETED</p>` },
    
    { key: "2", note: "Exercise 2", content: `<strong><p>React-Native Home-Exercise web project</p></strong>
    <ul>
    <li>Home – In the Home tab, display your full name</li>
    <li>Exercise – In the Exercises tab, create cards that list the exercises with descriptions rendered in HTML</li>
    </ul>
    <p>STATUS: COMPLETED</p>` },
    
    { key: "3", note: "Exercise 3", content: `<strong><p>Log-in Screen</p></strong>
    <ul>
    <li>Must incorporate;</li>
    <li>Email (Text Input)</li>
    <li>Password (Text Input)</li>
    <li>Login (Button)</li>
    </ul>
    <p>STATUS: COMPLETED</p>` },
    
    { key: "4", note: "Exercise 4", content: `<strong><p>Stopwatch</p></strong>
    <ul>
    <li>Using the useState and useEffect hooks, create a stopwatch with two buttons:</li>
    <li>one for Start/Stop</li>
    <li>and one for Reset</li>
    </ul>
    <p>STATUS: COMPLETED</p>` },
    
    { key: "5", note: "Exercise 5", content: `<strong><p>Register Screen</p></strong>
    <ul>
    <li>Must incorporate;</li>
    <li>Image (Image picker when image selected should display the image selected)</li>
    <li>Email (Text Input)</li>
    <li>Name (Text Input)</li>
    <li>Password (Text Input)</li>
    <li>Register (Button)</li>
    </ul>
    <p>STATUS: COMPLETED</p>` }
];

// Reducer function
const exerciseReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_SELECT":
            return {
                ...state,
                selected: state.selected === action.payload ? null : action.payload,
            };
        case "UPDATE_CONTENT":
            return {
                ...state,
                exercises: state.exercises.map((ex) =>
                    ex.key === action.payload.key ? { ...ex, content: action.payload.newContent } : ex
                ),
            };
        default:
            return state;
    }
};

// Create context
const ExerciseContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Provider component
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(exerciseReducer, { exercises: initialExercises, selected: null });

    return (
        <ExerciseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    );
};

// Hook to use context
export const useExerciseContext = () => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error("useExerciseContext must be used within an ExerciseProvider");
    }
    return context;
};
