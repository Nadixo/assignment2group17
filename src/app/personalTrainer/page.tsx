'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export type Exercise = {
  exerciseId: number;
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  time: string;
  workoutProgramId: number;
  personalTrainerId: number;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: number;
};

export type workoutProgram = {
  workoutProgramId?: number;
  name?: string;
  description: string;
  exercises: Exercise[];
  personalTrainerId: number;
  clientId: number;
};

const personalTrainer = () => {
  const auth = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [workOuts, setWorkOuts] = useState<workoutProgram[]>([]);
  const [workOutOnId, setWorkOutOnId] = useState<workoutProgram>();

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl =
        'https://afefitness2023.azurewebsites.net/api/Users/Clients';

      const accessToken = auth.token;
      console.log('halløj', accessToken);
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: any = await response.json();
        console.log('Client Data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getWorkOuts = async () => {
      const apiUrl =
        'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms';

      const accessToken = auth.token;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: any = await response.json();
        console.log('Workout Data:', data);
        setWorkOuts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getUsers();
    getWorkOuts();
  }, [auth.token]);

  const getWorkOutOnId = async (workoutProgramId: number) => {
    const apiUrl = new URL(
      `https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgramId}`
    );
    console.log(apiUrl);

    const accessToken = auth.token;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: any = await response.json();
      console.log('Workout Data:', data);
      setWorkOutOnId(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const workoutProgramId = parseInt(
      formData?.get('workoutProgramId')?.toString()!
    );
    try {
      await getWorkOutOnId(workoutProgramId);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };
  const addExercise = async (exercise: Exercise) => {
    const apiUrl = new URL(
      `https://afefitness2023.azurewebsites.net/api/Exercises/Program/${exercise.workoutProgramId}`
    );

    const accessToken = auth.token;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: exercise.name,
          description: exercise.description,
          sets: exercise.sets,
          repititions: exercise.repetitions,
          time: exercise.time,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: any = await response.json();
      console.log('Add Exercise Data:', data);
      alert('New exercises added to workout program');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmitNewExercise = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const exercise: Exercise = {
      exerciseId: 0,
      name: formData.get('name')?.toString()!,
      description: formData.get('description')?.toString()!,
      sets: parseInt(formData?.get('sets')?.toString()!),
      repetitions: parseInt(formData?.get('reps')?.toString()!),
      time: formData.get('time')?.toString()!,
      workoutProgramId: parseInt(
        formData?.get('workoutProgramId')?.toString()!
      ),
      personalTrainerId: 0,
    };
    addExercise(exercise);
  };
  return (
    <div>
      <div>
        <h2>
          {' '}
          <Link href='/'> Home </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link href='/personalTrainer/addclient'> Add client </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link href='/personalTrainer/createNewWorkoutProgram'>
            {' '}
            Add workout program{' '}
          </Link>{' '}
        </h2>
      </div>
      <h2>Add new exercise to workout program</h2>
      <form onSubmit={handleSubmitNewExercise}>
        <ul>
          <li>
            <label>Workout Program Id</label>
            <input type='number' name='workoutProgramId'></input>
          </li>
          <li>
            <label>Name</label>
            <input type='text' name='name'></input>
          </li>
          <li>
            <label>Description</label>
            <input type='text' name='description'></input>
          </li>
          <li>
            <label>Sets</label>
            <input type='number' name='sets'></input>
          </li>
          <li>
            <label>Repition</label>
            <input type='number' name='reps'></input>
          </li>
          <li>
            <label>Time</label>
            <input type='text' name='time'></input>
          </li>
          <button type='submit'>Add exercise</button>
        </ul>
      </form>
      <h1>Specific workout program</h1>
      <form onSubmit={handleSubmit}>
        <label>
          workoutProgramId:
          <input type='number' name='workoutProgramId' />
        </label>
        <button type='submit'>See workout program</button>
      </form>
      <ul>
        <li key={workOutOnId?.workoutProgramId}>
          <h3>{workOutOnId?.name}</h3>
          <div>{workOutOnId?.description}</div>
          <ul>
            {workOutOnId?.exercises.map((exercise) => (
              <li key={exercise.exerciseId}>
                <h4>{exercise.name}</h4>
                <div>Description: {exercise.description}</div>
                <div>Sets: {exercise.sets}</div>
                <div>Repitions: {exercise.repetitions}</div>
                <div>Time: {exercise.time}</div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <h1>Users List:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <div>{user.email}</div>
            <div>Id: {user.userId}</div>
          </li>
        ))}
      </ul>
      <h1>Workout program List:</h1>
      <ul>
        {workOuts.map((workOut) => (
          <li key={workOut.workoutProgramId}>
            <h3>
              {workOut.name} : {workOut.workoutProgramId}
            </h3>
            <div>{workOut.description}</div>
            <ul>
              {workOut.exercises.map((exercise) => (
                <li key={exercise.exerciseId}>
                  <h4>{exercise.name}</h4>
                  <div>Description: {exercise.description}</div>
                  <div>Sets: {exercise.sets}</div>
                  <div>Repitions: {exercise.repetitions}</div>
                  <div>Time: {exercise.time}</div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default personalTrainer;
