"use client"
import { createContext } from 'react';
import { useState } from "react";
import dayjs from 'dayjs';

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState({
        id: 0,
        general: '',
        topic: '',
        projectStart: dayjs(),
        projectEnd: dayjs().add(7, 'day'),
        initial: '',
        goal: '',
        implementation: '',
        timeManagement: '',
        presentationTools: '',
        attachments: null,
        accepted: null,
        forChecking: true,
        ldapUsernameStudent: '',
        ldapUsernameTeacher: '',
        teacherComment: ''
    });
  
    return (
      <TeacherContext.Provider value={{ teacher, setTeacher }}>
        {children}
      </TeacherContext.Provider>
    );
};