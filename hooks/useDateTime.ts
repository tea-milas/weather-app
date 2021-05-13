import React, {useState, useEffect}  from 'react';

const useDateTime = () => {
    const [dayOfTheWeek, setDayOfTheWeek] = useState('');
    const [dayOfTheMonth, setDayOfTheMonth] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState('');

    const getTime = () => {
        const d = new Date();
        setHours(d.getHours());

        if (d.getMinutes() < 10) {
            setMinutes(`0${d.getMinutes()}`);
        } else {
            setMinutes(`${d.getMinutes()}`)
        }
        
        setTimeout(getTime, 30000);
    }

    const getDate = () => {
        const d = new Date();
        switch (d.getDay()) {
            case 0:
                setDayOfTheWeek("Sunday");
              break;
            case 1:
                setDayOfTheWeek("Monday");
              break;
            case 2:
                setDayOfTheWeek("Tuesday");
              break;
            case 3:
                setDayOfTheWeek("Wednesday");
              break;
            case 4:
                setDayOfTheWeek("Thursday");
              break;
            case 5:
                setDayOfTheWeek("Friday");
              break;
            case 6:
                setDayOfTheWeek("Saturday");
        }

        setDayOfTheMonth(d.getDate());
    }

    useEffect(() => {
        getTime();
        getDate();
    }, [30000])

    return [dayOfTheWeek, dayOfTheMonth, hours, minutes]
}

export default useDateTime;
