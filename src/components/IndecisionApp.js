import React from 'react'

import AddOption from './AddOption'
import Action from './Action'
import Options from './Options'
import Header from './Header'

export default class IndecisionApp extends React.Component {
    state = {
      options: []
    };
    
    // Lifecycle methods
    // When component is created
    componentDidMount() {
      try {
        const aOptions = JSON.parse(localStorage.getItem('options'))
        console.log(aOptions)
        if (aOptions) {
          this.setState(() => ({ options: aOptions }))
        }
      } catch (e) {
        // Do nothing
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const asOptions = JSON.stringify(this.state.options)
        localStorage.options = asOptions
      }
    }
    // When component is removed (switching page)
    componentWillUnmount() {
      console.log('componentWillUnmount')
    }
  
    /*****/
  
    handleDeleteOptions =() => {
      this.setState(() => ({ options: [] }));
    }
    handleDeleteOption =(optionToRemove) => {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option)
      }));
    }
    handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
    }
    handleAddOption = (option) => {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({
        options: prevState.options.concat(option)
      }));
    }
    render() {
      const subtitle = 'Put your life in the hands of a computer';
  
      return (
        <div>
          <Header subtitle={subtitle} />
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption
            handleAddOption={this.handleAddOption}
          />
        </div>
      );
    }
  }