import db from '../db/connection';
import { Assignment } from '../../models/modelAssignment'; 

// Function to get all assignments from the database
export async function getAssignments(): Promise<Assignment[]> {
  return db('assignments').select('id', 'title', 'description', 'dueDate', 'userId');
}

// Function to update an assignment by ID
export async function updateAssignmentById(updatedAssignment: Partial<Assignment>, id: number) {
  const result = await db('assignments').where({ id }).update(updatedAssignment);
  return result;
}

// Function to get an assignment by ID
export async function getAssignmentById(id: number): Promise<Assignment | undefined> {
  const result = await db('assignments')
    .where({ id })
    .select('id', 'title', 'description', 'dueDate', 'userId')
    .first();
  return result;
}

// Function to add a new assignment to the database
export async function addAssignment(newAssignment: Assignment): Promise<number> {
  const result = await db('assignments').insert({
    title: newAssignment.title,
    description: newAssignment.description,
    dueDate: newAssignment.dueDate,
    userId: newAssignment.userId,
  });
  return result[0]; // Assuming id is auto-generated
}

// Function to delete an assignment by ID
export async function deleteAssignmentById(id: number) {
  const result = await db('assignments').where({ id }).delete();
  return result;
}
