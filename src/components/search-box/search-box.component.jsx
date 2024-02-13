import { Component } from "react";
import './search-box.styles.css';

const SearchBox = (props) => {
    const {onChangeHandler, placeholder, className} = props;
    return (
        <input 
        type="search"
        className={`search-box ${className}`}
        placeholder={placeholder} 
        onChange={onChangeHandler}/>
    );
}

/*
class SearchBox extends Component {

    render() {
        const {onChangeHandler, placeholder, className} = this.props;
        return (
            <input 
            type="search"
            className={`search-box ${className}`}
            placeholder={placeholder} 
            onChange={onChangeHandler}/>
        );
    }
}*/

export default SearchBox;