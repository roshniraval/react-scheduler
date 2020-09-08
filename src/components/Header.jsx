import * as React from "react";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import NewShiftDialog from './newShiftDialog';
// import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: false
        }
    }
    renderDialog =() => {
        return <NewShiftDialog 
        open={this.state.hideDialog} 
        dialogClose={this.dialogClose} 
        employeeData={this.props.employeeData}/>
    }

    handleClick = () => {
        this.setState({ hideDialog: true})
    }


    searchOnclick() {
    const searchText=document.getElementById('search').value
    console.log(searchText);
     let filterData = []
     const data = this.props.data.filter(item => item.Subject.includes(searchText) )
    
    if(data){

     data.forEach(events => {

        this.props.employeeData.forEach(employees => {
         if (events.Id !== employees.Id) {
                 filterData.push(employees)
             }
         })      
     })
    this.props.handleFilter(filterData);

    }
    }
  clearOnClick() {
        // document.getElementById('schedule').style.display = 'block';
        document.getElementById('search').value='';
        // this.showSearchEvents('hide');
        this.props.handleFilter()
    }

 
    render() {
        return (
            <div>                
                <div 
                style={
                    {display:'flex', 
                    alignItems:'center', 
                    marginBottom: '20px', 
                    padding:'15px'
                    }
                }>
                    <ButtonComponent onClick={this.handleClick}> 
                        <span 
                        className='e-icons add-new' 
                        style={{marginRight:'5px'}}>                             
                        </span>
                        New
                    </ButtonComponent >

                         <div className="property-panel-content" style={{flex:'auto'}}>
                            <input className="e-input" type="text" placeholder="Enter the Search text" name='search' id='search' style={{marginLeft:'10px'}}/>
                       </div>
                    <ButtonComponent title='Search' type='button' onClick={this.searchOnclick.bind(this)}>Search</ButtonComponent>
                 
                    <div className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                      <ButtonComponent title='Clear' type='button' onClick={this.clearOnClick.bind(this)}>Clear</ButtonComponent>
                    </div>

                     <div style={{flex:'1 1 auto'}} ></div>
                    <ButtonComponent 
                    onClick={() => this.props.toggleSchedules('my_schedule')}>
                        My Schedule
                    </ButtonComponent>
                    <ButtonComponent 
                    onClick={() => this.props.toggleSchedules('full_schedule')}>
                        Full Schedule</ButtonComponent>
                </div>     
                {this.renderDialog()}
            </div>
        )
    }
}

export default Header;