'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Exercise } from './page';
import { workoutProgram } from './page';
import { useAuth } from '@/hooks/useAuth';

const workOutProgram = () => {
  const [workOuts, setWorkOuts] = useState<workoutProgram[]>([]);
  const router = useRouter();
  const { workoutProgram } = router.query;
  const auth = useAuth();

  useEffect(() => {
    const getWorkOuts = async () => {
      const apiUrl =
        'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgram}';

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

    getWorkOuts();
  }, []);
  return (
    <div>
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

export default workOutProgram;
