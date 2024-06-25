import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

//import logo from './images/AJF..png'
import NewsCards from '../src/components/NewsCards/NewsCards';

import useStyles from './styles';

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const classes = useStyles();
  
    useEffect(() => {
      alanBtn({
          key: 'bb41451956350aac52dfb03b8b9a962d2e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'instructions') {
              setIsOpen(true);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > articles.length) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }, []);
    
      return (
        <div>
          <div className={classes.logoContainer}>
            {newsArticles.length ? (
              <div className={classes.infoContainer}>
                <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
              </div>
            ) : null}
            <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
          </div>
          <NewsCards articles={newsArticles} activeArticle={activeArticle} />
          {!newsArticles.length ? (
            <div className={classes.footer}>
              <Typography variant="body1" component="h2">
                
              </Typography>
              
            </div>
          ) : null}
        </div>
      );
    };
    
    export default App;
    