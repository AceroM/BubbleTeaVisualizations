import React, { Component } from 'react';
import './WordCloud.scss';
import ReactWordcloud from 'react-wordcloud';

class WordCloudModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      wordCountArr: null,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/reviews')
      .then(res => res.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({ wordCountArr: this.countWords(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  countWords(data) {
    let wordCount = {};
    let output = [];
    for (let i = 0; i < data.length; i++) {
      let entry = data[i];
      // clean word: removes punctuation and sets to lower case
      entry = entry.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      // splits words into array by whitespace
      let words = entry.split(' ');
      
      // for each word, create new key value entry of word and count
      words.forEach(function (word, index) {
        if (word in wordCount) {
          wordCount[word] += 1;
        }
        else {
          wordCount[word] = 1;
        }
      });
    }
    
    // after consolidating ALL words and values, create text/value pairs, update output array
    for (const [key, value] of Object.entries(wordCount)) {
      let dict = { text: key, value: value };
      output.push(dict);
    }
    return output;
  }

  render() {
    const { data, wordCountArr } = this.state;
    const resizeStyle = {
      height: '50%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    //   border: 'solid 1px #ddd',
      background: '#ffffff',
    };
    const options = {
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
      enableTooltip: true,
      deterministic: false,
      fontFamily: 'impact',
      fontSizes: [30, 90],
      fontStyle: 'normal',
      fontWeight: 'normal',
      padding: 1,
      rotations: 3,
      rotationAngles: [0, 90],
      scale: 'sqrt',
      spiral: 'archimedean',
      transitionDuration: 1000,
    };

    return (
      <div align="center">
        {this.state.wordCountArr ?
          <div style={resizeStyle} >
            <ReactWordcloud words={wordCountArr} options={options} />
          </div>
          : <p>NO DATA</p>
        }
      </div>
    );
  }
}

export default WordCloudModal;
