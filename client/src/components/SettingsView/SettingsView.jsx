import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components'


const EnglishBtn = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  ${props => props.englishPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 14.25px;
`}
`
const SpanishBtn = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  ${props => props.spanishPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 14.25px;
`}
`

const Settings = () => {
  const [englishPrimary, setEnglishPrimary] = useState(false)
  const [spanishPrimary, setSpanishPrimary] = useState(false)
  const { t, i18n } = useTranslation();
  
  function getLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div>
      <br/>
      <h5>Settings</h5>
      <hr/>
      <br/>
      <button
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  setDarkDiv(true);
                  console.log(isDarkMode);
                  localStorage.setItem('isDarkMode', !isDarkMode);
                }}
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{ fill: "#F6C358" }} d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z" /></svg></button>
      <br/>
      <br/>
      <br/>

      <EnglishBtn 
      englishPrimary={englishPrimary}
      onClick={()=>{
        getLang('en')
        setEnglishPrimary(!englishPrimary)
        setSpanishPrimary(false)
      }}>
        {t('englishBtn')}
        </EnglishBtn>
      <SpanishBtn 
      spanishPrimary={spanishPrimary}
      onClick={()=>{
        setSpanishPrimary(!spanishPrimary)
        setEnglishPrimary(false)
        getLang('sp')
        }}>
          {t('spanishBtn')}
          </SpanishBtn>
    </div>
  )
};

export default Settings;