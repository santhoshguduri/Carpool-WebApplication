import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { autocompleteToSuccess, autocompleteFromSuccess, autocompleteCheckpointSuccess } from '../../Redux/Actions/AutocompleteActions';
 
class AutoComplete extends React.Component {
    constructor(props){
        super(props);
    this.state={
        place:''
    }
    }
 
  handleChange = (place) => {
    this.setState({ place });
    if(this.props.search=="from")
    {
      this.props.onSearchFromAutocomplete(place);
    }
    else if(this.props.search == "to"){
      this.props.onSearchToAutocomplete(place);
    }
    else if(this.props.search == "stop"){
      console.log(this.props.indexKey-1);
      this.props.handleOnChange(place,this.props.indexKey-1);
    }
  }
 
  render() {
    return (
      <PlacesAutocomplete 
        value={this.state.place}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input style={{zIndex:"-1"}} ref={(input) =>this.getAreaName=input}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            required/>
            <div aria-labelledby="dropdownMenuButton" style={{position:"absolute",backgroundColor:'#fff',zIndex:"1"}}> 
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div 
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    {suggestion.description}
                    <hr style={{color: "#eaeaea",margin:"1px"}}></hr>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onSearchFromAutocomplete : (data) => dispatch(autocompleteFromSuccess(data)),
    onSearchToAutocomplete : (data) => dispatch(autocompleteToSuccess(data)),
    viaPointAutocomplete : (data) => dispatch(autocompleteCheckpointSuccess(data))
  }
}

export default connect(null,mapDispatchToProps)(AutoComplete);