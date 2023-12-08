'use client';
import Link from 'next/link';
import { Exercise, workoutProgram } from '../page';
import { useAuth } from '@/hooks/useAuth';

const createNewWorkoutProgram = () => {
  const auth = useAuth();

  const createWorkoutProgram = async (_workoutProgram: workoutProgram) => {
    const apiUrl =
      'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms';

    const accessToken = auth.token!;
    console.log(accessToken);
    console.log(_workoutProgram);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          workoutProgramId: _workoutProgram.workoutProgramId,
          name: _workoutProgram.name,
          description: _workoutProgram.description,
          exercises: [
            {
              exerciseId: _workoutProgram.exercises[0].exerciseId,
              name: _workoutProgram.exercises[0].name,
              description: _workoutProgram.exercises[0].description,
              sets: _workoutProgram.exercises[0].sets,
              repetitions: _workoutProgram.exercises[0].repetitions,
              time: _workoutProgram.exercises[0].time,
              workoutProgramId: _workoutProgram.exercises[0].workoutProgramId,
              personalTrainerId: _workoutProgram.exercises[0].personalTrainerId,
            },
          ],
          personalTrainerId: _workoutProgram.personalTrainerId,
          clientId: _workoutProgram.clientId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data:', data);
      alert('New workout program created');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const exercise: Exercise = {
      exerciseId: 0,
      name: formData.get('exName')?.toString()!,
      description: formData.get('exDescription')?.toString()!,
      sets: parseInt(formData?.get('sets')?.toString()!),
      repetitions: parseInt(formData?.get('repetitions')?.toString()!),
      time: formData.get('time')?.toString()!,
      workoutProgramId: 0,
      personalTrainerId: 0,
    };
    var exerciseList: Exercise[] = [];
    exerciseList.push(exercise);
    const _workoutProgram: workoutProgram = {
      workoutProgramId: 0,
      name: formData.get('name')?.toString()!,
      description: formData.get('description')?.toString()!,
      exercises: exerciseList,
      personalTrainerId: 0,
      clientId: parseInt(formData?.get('clientId')?.toString()!),
    };
    if (
      _workoutProgram.clientId >= 0 &&
      _workoutProgram.description.length > 0 &&
      _workoutProgram.name!.length > 0 &&
      _workoutProgram.exercises != null &&
      _workoutProgram.exercises[0].name.length > 0 &&
      _workoutProgram.exercises[0].description.length > 0 &&
      _workoutProgram.exercises[0].sets >= 0 &&
      _workoutProgram.exercises[0].repetitions >= 0 &&
      _workoutProgram.exercises[0].time.length > 0
    ) {
      createWorkoutProgram(_workoutProgram);
      // router.push('TrainerAllExercises');
      // router.refresh();
    } else alert('workout creation failed');
  };
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <h2>
        {' '}
        <Link href='/personalTrainer'> Back </Link>{' '}
      </h2>
      <form onSubmit={handleSubmit}>
        <li>
          <label>
            Workout program name:
            <input type='text' name='name' />
          </label>
        </li>
        <li>
          <label>
            description:
            <input type='text' name='description' />
          </label>
        </li>
        <li>
          <label>
            clientId:
            <input type='number' name='clientId' />
          </label>
        </li>
        <li>
          <label>
            Exercise name:
            <input type='text' name='exName' />
          </label>
        </li>
        <li>
          <label>
            Exercise description:
            <input type='text' name='exDescription' />
          </label>
        </li>
        <li>
          <label>
            sets:
            <input type='number' name='sets' />
          </label>
        </li>
        <li>
          <label>
            repetitions:
            <input type='number' name='repetitions' />
          </label>
        </li>
        <li>
          <label>
            time:
            <input type='text' name='time' />
          </label>
        </li>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};
export default createNewWorkoutProgram;
