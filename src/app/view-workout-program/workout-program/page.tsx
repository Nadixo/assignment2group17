'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Exercise } from '../page';
import { workoutProgram } from '../page';
import { useSearchParams } from 'next/navigation';
const workOutProgram = () => {
  const searchParams = useSearchParams();
  const workOutSearch = searchParams.get('workOut');
  const workOut = JSON.parse(workOutSearch!);
  console.log(workOut);
  // const router = useRouter();
  // const { workoutProgram } = router.query;

  useEffect(() => {}, []);
  return (
    <div>
      <Link href='/view-workout-program'>Back</Link>
      <h1>Workout program List:</h1>
      <ul>
        <li key={workOut!.workoutProgramId}>
          <h3>
            {workOut!.name} : {workOut!.workoutProgramId}
          </h3>
          <div>{workOut!.description}</div>
          <ul>
            {workOut!.exercises.map((exercise: any) => (
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
    </div>
  );
};

export default workOutProgram;
