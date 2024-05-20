export const parseOldStudent = (student) => {
    if (student.version === 2) return student;
    const newCrossQuestioning = student.crossQuestioning == 'Good' ? 10 : student.crossQuestioning == 'Avg' ? 5 : 0;
    const newExplaination = student.explaination == 'Good' ? 10 : student.explaination == 'Avg' ? 5 : 0;
    const newStudent = {
        ...student,
        crossQuestioning: newCrossQuestioning,
        explaination: newExplaination,
    };
    return newStudent;
};