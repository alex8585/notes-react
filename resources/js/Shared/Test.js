import React, { useContext } from 'react';
import ThemeContext from '@/Context/ThemeContext';
import withTest from "@/Hocs/withTest";



function Test({ className }) {
  const themes = useContext(ThemeContext)
  //console.log(t);
  return ( 
        <header>
          {themes.foreground} 
        </header>
    );
};
export default  withTest(Test);