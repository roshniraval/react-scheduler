import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { RecurrenceEditorComponent} from '@syncfusion/ej2-react-schedule';
import * as React from "react";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent  } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// import './App.css';



class NewShiftDialog extends React.Component {    
    constructor(props) {
        super(props)
        this.fields = { text: 'Text', value: 'Id' };
        this.employeeData = [
            {Text: 'Unassigned', Id: 0},
            ...this.props.employeeData
        ]
    }
// ******* You can add additional events by using popupOpen  event
    onPopupOpen(args) {
        if (args.type === 'Editor') {
            this.scheduleObj.setRecurrenceEditor(this.recurrObject);
        }
    }

    handleDialogSave = (args) =>  {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data = args.data instanceof Array ? args.data[0] : args.data;
            if (!this.scheduleObj.isSlotAvailable(data.StartTime, data.EndTime)) {
                args.cancel = true;
            }
        }
    }

    render(){
        return(
            <div id="dialog-content">
                <DialogComponent
                    width='400px'
                    isModal={true}
                    target='#dialog-content'
                    visible={this.props.open}
                    >
                    <table className="custom-event-editor" style={{ width: '100%', cellpadding: '10' }}><tbody>
                        <th style={{textAlign:'center'}}>Shift Editor</th>
                        <tr><td className="e-textlabel">Summary</td><td style={{ colspan: '4' }}>
                            <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
                        </td></tr>
                        <tr><td className="e-textlabel">Employee</td><td style={{ colspan: '4' }}>
                            <MultiSelectComponent  
                            id="EventType" 
                            placeholder='Choose employee' 
                            data-name='EventType' 
                            className="e-field" 
                            style={{ width: '100%' }} 
                            fields={this.fields}
                            dataSource={this.employeeData}>                                
                            </MultiSelectComponent >
                        </td></tr>
                        <tr><td className="e-textlabel">From</td><td style={{ colspan: '4' }}>
                            <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime"  className="e-field"></DateTimePickerComponent>
                        </td></tr>
                        <tr><td className="e-textlabel">To</td><td style={{ colspan: '4' }}>
                            <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime"  className="e-field"></DateTimePickerComponent>
                        </td></tr>
                        <tr><td className="e-textlabel">Recurrence</td><td colSpan={4}>
                     <RecurrenceEditorComponent ref={recurrObject => this.recurrObject = recurrObject} id='RecurrenceEditor'></RecurrenceEditorComponent>
                        </td></tr>
                        <tr><td className="e-textlabel">Reason</td><td style={{ colspan: '4' }}>
                            <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
                        </td></tr></tbody></table>
                     <ButtonComponent onClick={this.handleDialogSave}>SAVE</ButtonComponent>
                     <ButtonComponent onClick={this.props.dialogClose}>CANCEL</ButtonComponent>
                     
               </DialogComponent>
            </div>
        )
    }
   
}
export default NewShiftDialog;