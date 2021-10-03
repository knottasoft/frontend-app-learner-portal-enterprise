// TODO: Need translation
import React, { useContext, useState, useRef } from 'react';
import moment from 'moment';
import { Button, Input } from '@edx/paragon';

import { CourseContext } from './CourseContextProvider';
import { SET_COURSE_RUN } from './data/constants';

export default function CourseRunSelector() {
  const { dispatch, state } = useContext(CourseContext);
  const {
    activeCourseRun,
    availableCourseRuns,
  } = state;
  const [editing, setEditing] = useState(false);
  const selectRef = useRef(activeCourseRun.uuid);
  const multipleRunsAvailable = availableCourseRuns?.length > 1;

  const handleClick = () => {
    const selectedCourseRun = availableCourseRuns.find((courseRun) => courseRun.uuid === selectRef.current.value);
    dispatch({ type: SET_COURSE_RUN, payload: selectedCourseRun });
    setEditing(false);
  };

  if (multipleRunsAvailable) {
    if (!editing) {
      return (
        <Button
          variant="link"
          onClick={() => setEditing(true)}
          className="mb-2 p-0"
        >
            другие даты
        </Button>
      );
    }
    return (
      <div className="d-inline-flex mb-2">
        <Input
          name="courseRun"
          className="form-control-sm"
          type="select"
          label="Дата начала:"
          defaultValue={activeCourseRun.uuid}
          options={
            availableCourseRuns.map(({ start, uuid }) => (
              {
                label: moment(start).format('DD.MM.YYYY'),
                value: uuid,
              }
            ))
          }
          ref={selectRef}
        />
        <Button
          variant="outline-primary"
          className="btn-brand-outline-primary btn-sm ml-2"
          onClick={() => handleClick()}
        >
            перейти
        </Button>
      </div>
    );
  }
  return null;
}
