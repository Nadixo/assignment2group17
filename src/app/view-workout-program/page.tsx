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

export type workoutProgram = {
  workoutProgramId?: number;
  name?: string;
  description: string;
  exercises: Exercise[];
  personalTrainerId: number;
  clientId: number;
};

const client = () => {
  const [workOuts, setWorkOuts] = useState<workoutProgram[]>([]);
  const auth = useAuth();

  const getWorkOuts = async () => {
    const apiUrl =
      'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms';

    // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
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

  useEffect(() => {
    getWorkOuts();
  }, [auth]);
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <h1>Workout program List:</h1>
      <ul>
        {workOuts.map((workOut) => (
          <li key={workOut.workoutProgramId}>
            <h3>
              {workOut.name} :{' '}
              <Link
                href={{
                  pathname: '/view-workout-program/workout-program',
                  query: { workOut: JSON.stringify(workOut) },
                }}
              >
                {workOut.workoutProgramId}
              </Link>
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

export default client;
