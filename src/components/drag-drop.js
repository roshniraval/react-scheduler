import * as React from 'react';
import '../index.css';
import { ScheduleComponent,
    ResourcesDirective,
    ResourceDirective, 
    ViewsDirective, 
    ViewDirective, 
    Inject, 
    TimelineViews, 
    Resize, 
    DragAndDrop, 
    TimelineMonth, 
    Day , 
    Week
} from '@syncfusion/ej2-react-schedule';
import { extend ,isNullOrUndefined,enableRipple} from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import Header from './Header'
enableRipple(true);

export class SchedulerComponent extends SampleBase {    
    constructor() {
        super(...arguments);
        this.employeeData = [
            { Text: 'Alice', EmployeeId: 1, GroupId: 1,  Color: '#cb6bb2', Designation: 'Content writer' },
            { Text: 'Nancy', EmployeeId: 2, GroupId: 2, Color: '#df5286', Designation: 'Designer' },
            { Text: 'Cobert', EmployeeId: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
            { Text: 'Robson', EmployeeId: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Software Engineer' },
            { Text: 'Laura', EmployeeId: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
            { Text: 'Margaret', EmployeeId: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' },
            { Text: 'Iliye', EmployeeId: 7, GroupId: 1, Color: '#bbdc00', Designation: 'Electrician' },
            { Text: 'Mcy Salzar', EmployeeId: 8, GroupId: 2, Color: '#9e5fff', Designation: 'Physician' },
            { Text: 'Laura Albert', EmployeeId: 9, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
            { Text: 'Yargaret Robert', EmployeeId:10, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' },
            { Text: 'Aliye Zack', EmployeeId: 11, GroupId: 1, Color: '#bbdc00', Designation: 'Electrician' },
            { Text: 'Zcy Lily', EmployeeId: 12, GroupId: 2, Color: '#9e5fff', Designation: 'Physician' },            
        ]        
        // this.isTreeItemDropped = false;
        this.draggedItemId = '';
        this.allowDragAndDrops = true;
        this.data = extend([], dataSource.blockData, null, true);
        this.up = true;
        // this.departmentData = [
        //     { Text: 'Project1', Id: 1, Color: '#cb6bb2' },
        //     { Text: 'Project2', Id: 2, Color: '#9e5fff' }
        // ];

        this.count = 1;
    }
    getEmployeeName(value) {
        return value.resourceData[value.resource.textField];
    }
    getEmployeeImage(value) {
        let resourceName = this.getEmployeeName(value);
        return resourceName.toLowerCase();
    }
    getEmployeeDesignation(value) {
        return value.resourceData.Designation;
    }
    headerTooltipTemplate(props) {
        return (<div className="template-wrap">
            <div className="employee-name">{this.getEmployeeName(props)}</div>
        </div>);
    }
    resourceHeaderTemplate(props) {
        return (
            <div 
            className="template-wrap">
                <div className="employee-category">
                    <div className={"employee-image " + this.getEmployeeImage(props)}>
                    </div>
                    <div className="employee-name">
                        {this.getEmployeeName(props)}
                    </div>
                    <div className="employee-designation">
                        {this.getEmployeeDesignation(props)}
                    </div>
                </div>
            </div>
        );
    }
    onDragStart(args) {
        args.navigation.enable = true;
    }

    change(args) {
        this.scheduleObj.selectedDate = args.value;
        this.scheduleObj.dataBind();
    }    

    toggleSchedules = (schedule_type) => {
        if (schedule_type === 'my_schedule') {
            const data = this.employeeData.filter(item => item.Id !== 1);
            data.forEach(element => {
                this.scheduleObj.removeResource(element.Id, 'Employee');               
            });
        } else {
            this.scheduleObj.refresh()
        }
    }
    timelineEventTemplate(props) {
        return (
            <div 
            className="template-wrap" 
            style={{ background: props.PrimaryColor }}>
                <div 
                className="subject" 
                style={{ background: props.SecondaryColor }}>
                    {props.Subject}
                </div>
            </div>
        );
    }
    onRenderCell(args) {
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
          let target = args.element.querySelector('.e-resource-text');
          target.innerHTML = "<div><span style='margin-right: 10px'>Id</span><span id='Id' class='e-icons up id'></span> " +
          "<span style='margin-right: 10px;'>Employee</span><span id='Text' class='e-icons up employee'>"+
           "</span>"+
          "<br/>"+ 
         " <span style='margin-right: 10px; color:white'>Id</span>"+
         "<span id='Id' class='e-icons down id'>"+
           "</span>"+ 
           " <span style='margin-right: 10px; color:white'>Employee</span>"+
           "<span id='Text' class='e-icons down employee'> "+
           "</span>"+
           "</div>";
        }
      }

      onDataBinding(args) {
        if (!isNullOrUndefined(document.querySelector(".cuz-table").children[0].children[0])) {
          let tableChildren = (document.querySelector(".cuz-table").children[0].children).length;
          for (let k = 0; k < tableChildren; k++) {
            document.querySelector(".cuz-table").children[0].children[0].remove();
          }
        }
        if (isNullOrUndefined(document.querySelector('.test-last-cell'))) {
          for (let j = 0; j < this.count; j++) {
            if (document.querySelector('.cuz-table')) {
              let tr = document.querySelector('.cuz-table').children[0];
              let teEle = document.createElement("tr");
              tr.append(teEle);
              (tr.children[j]).insertCell(0).setAttribute('class', 'test-last-cell');
              (tr.children[j]).insertCell(0).setAttribute('class', 'test-last-rec');
              let node = document.createElement("div");
              node.setAttribute('class', 'test-last-rec-divzz');
              document.querySelectorAll('.test-last-rec')[j].appendChild(node);
              let test_div = document.createElement("div");
              test_div.setAttribute('class', 'test-last-cell-divzz');
              document.querySelectorAll('.test-last-cell')[j].appendChild(test_div);
              let table = document.createElement("TABLE");
              table.setAttribute('class', 'test-last-table');
              document.querySelectorAll('.test-last-cell-divzz')[j].appendChild(table);
              let tbody = document.createElement("TBODY");
              tbody.setAttribute('class', 'test-last-tbody');
              document.querySelectorAll('.test-last-table')[j].appendChild(tbody);
              let tbody_tr = document.createElement("TR");
              tbody_tr.setAttribute('class', 'test-last-tr');
              document.querySelectorAll('.test-last-tbody')[j].appendChild(tbody_tr);
              let td_cell = document.querySelector(".e-work-cells").parentElement;
              let length = td_cell.childElementCount;
              for (let i = 0; i < length; i++) {
                (document.querySelectorAll(".test-last-tr")[j]).insertCell(0).setAttribute('class', 'test-last-td');
              }
            }
            let dataDate = document.querySelector(".e-work-cells").parentElement;
            let customRow = document.querySelectorAll(".test-last-td");
            let length = dataDate.childElementCount;
            for (let j = 0; j < length; j++) {
              customRow[j].setAttribute("data-date", dataDate.children[j].getAttribute("data-date"));
            }
          }
          document.querySelector(".cuz-table").children[0].children[0].classList.add("tr-custom-row");
          (document.querySelectorAll('.test-last-cell-divzz')[0]).style.width = ((document.querySelector('.e-content-wrap')).offsetWidth).toString() + "px";
          document.querySelectorAll('.test-last-rec-divzz')[0].innerHTML = "Total Hours";
          document.querySelector(".e-content-wrap").addEventListener("scroll", myFunction);
          function myFunction() {
            let left = document.querySelector('.e-content-wrap').scrollLeft;
            (document.querySelectorAll('.test-last-cell-divzz')[0]).scrollLeft = left;
          }
          let div_ele = document.createElement("div");
          div_ele.setAttribute('class', 'time-cell-div');
          document.querySelectorAll(".e-resource-cells")[1].appendChild(div_ele);
          let div_count_ele = document.createElement("div");
          div_count_ele.setAttribute('class', 'count-cell-div');
          document.querySelectorAll(".e-resource-cells")[0].appendChild(div_count_ele);
        }
      }

    onDataBound() {     
        let proxy = this;   
        let renderedEvents = this.scheduleObj.getCurrentViewEvents();
        let resCol = this.employeeData;
        let totalHours = 0;      
        if (proxy.up)  {
            for (let i = 0; i < resCol.length; i++) {          
                let eventColByRes = renderedEvents.filter(x =>  x.EmployeeId === (resCol[i]).EmployeeId);          
                let hour = 0;
                for (let j = 0; j < eventColByRes.length; j++) {
                  let hourDiff = (eventColByRes[j].EndTime.getTime() - eventColByRes[j].StartTime.getTime()) / 1000;
                  hourDiff /= (60 * 60);
                  hour = hour + hourDiff;            
                }                  
                document.querySelectorAll('.employee-name')[i].innerText = (resCol[i]).Text + " (Hrs: " + hour.toString() + ")";          
                totalHours = totalHours + hour;          
              }
        } else {
            for (let i = resCol.length; i > 0; i--) {          
                let eventColByRes = renderedEvents.filter(x =>  x.EmployeeId === (resCol[i]).EmployeeId);          
                let hour = 0;
                for (let j = 0; j < eventColByRes.length; j++) {
                  let hourDiff = (eventColByRes[j].EndTime.getTime() - eventColByRes[j].StartTime.getTime()) / 1000;
                  hourDiff /= (60 * 60);
                  hour = hour + hourDiff;            
                }                  
                document.querySelectorAll('.employee-name')[i].innerText = (resCol[i]).Text + " (Hrs: " + hour.toString() + ")";          
                totalHours = totalHours + hour;          
              }
        }
        
        document.querySelector('.test-last-rec-divzz').innerText = "Total Hours: " + totalHours.toString();
        let renderDates = this.scheduleObj.getCurrentViewDates();        
        for (let i = 0; i < renderDates.length; i++) {
          let eventColByDate = (renderedEvents).filter(x => x.StartTime.getDate() === (renderDates[i]).getDate());
          let hourByDate = 0;
          for (let j = 0; j < eventColByDate.length; j++) {
            let hourDiff = (eventColByDate[j].EndTime.getTime() - eventColByDate[j].StartTime.getTime()) / 1000;
            hourDiff /= (60 * 60);
            hourByDate = hourByDate + hourDiff;
          }
          (document.querySelectorAll('.test-last-td')[i]).innerText = "Hrs: " + hourByDate.toString();
        }

        
        const upIcon = document.querySelector('.e-icons.up.id')
        upIcon.addEventListener("click", function () { 
          let data = extend([], proxy.employeeData, null, true);
          console.log(data);
          proxy.scheduleObj.resources[0].dataSource = data.sort(function (a,b) { 
              if(a[upIcon.id] < b[upIcon.id]){
                  return -1 
              }else if (a[upIcon.id] > b[upIcon.id] ){
                  return 1
              }else{
                  return 0
              }
                });
        });
        const downIcon = document.querySelector('.e-icons.down.id')
        downIcon.addEventListener("click", function () { 
          let data = extend([], proxy.employeeData, null, true);
          console.log(data);
          proxy.scheduleObj.resources[0].dataSource = data.sort(function (a,b) { 
              if(a[downIcon.id] > b[downIcon.id]){
                  return -1 
              }else if (a[downIcon.id] < b[downIcon.id] ){
                  return 1
              }else{
                  return 0
              }
                });
        });
        const upEmployeeIcon = document.querySelector('.e-icons.up.employee')
        upEmployeeIcon.addEventListener("click", function () { 
            // proxy.up = true;
          let data = extend([], proxy.employeeData, null, true);
          console.log(data);
          proxy.scheduleObj.resources[0].dataSource = data.sort(function (a,b) { 
              if(a[upEmployeeIcon.id] < b[upEmployeeIcon.id]){
                  return -1 
              }else if (a[upEmployeeIcon.id] > b[upEmployeeIcon.id] ){
                  return 1
              }else{
                  return 0
              }
                });
        });
        const downEmployeeIcon = document.querySelector('.e-icons.down.employee')
        downEmployeeIcon.addEventListener("click", function () { 
            // proxy.up = false;
          let data = extend([], proxy.employeeData, null, true);
          console.log(data);
          proxy.scheduleObj.resources[0].dataSource = data.sort(function (a,b) { 
              if(a[downEmployeeIcon.id] > b[downEmployeeIcon.id]){
                  return -1 
              }else if (a[downEmployeeIcon.id] < b[downEmployeeIcon.id] ){
                  return 1
              }else{
                  return 0
              }
                });
        });
    
        document.querySelector('.e-icons.down').addEventListener("click", function () {
          let data = extend([], proxy.employeeData, null, true);
          proxy.scheduleObj.resources[0].dataSource = data.sort(function (a,b) { 
                if(b.Text < a.Text){
                    return -1 
                }else if (b.Text > a.Text ){
                    return 1
                }else{
                    return 0
                }
           });
        });

      }
      

      handleFilter = (filterData) =>{

        if(!filterData){
            this.scheduleObj.refresh();
            return;
        }
        filterData.forEach(element => {
            this.scheduleObj.removeResource(element.Id, 'Employee');               
        });
      }

 
    render() {
        return (<div className='schedule-control-section'>
            <Header toggleSchedules={this.toggleSchedules} 
            employeeData={this.employeeData} 
            data={this.data} 
            handleFilter={this.handleFilter}/>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">                                                
                        <ScheduleComponent 
                        cssClass='virtual-scrolling block-events'
                        ref={schedule => this.scheduleObj = schedule}                         
                        width='100%' 
                        height='750px' 
                        // allowSorting={true}
                        // editorTemplate={this.editorTemplete}
                        // timeScale={{ enable: false }} 
                        selectedDate={new Date(2018, 7, 1)} 
                        currentView='TimelineMonth' 
                        showQuickInfo={false}                       
                        resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} 
                        eventSettings={{dataSource: this.data}}
                        renderCell={this.onRenderCell.bind(this)}
                        group={{ resources: ['Employee'] , headerTooltipTemplate: this.headerTooltipTemplate.bind(this)}}
                        dataBound={this.onDataBound.bind(this)}
                        dataBinding={(this.onDataBinding.bind(this))}
                      >
                          <ResourcesDirective>
                              <ResourceDirective 
                                field='EmployeeId' 
                                title='Employees' 
                                name='Employee' 
                                allowMultiple={false} 
                                dataSource={this.employeeData} 
                                textField='Text' 
                                idField='EmployeeId'                                
                                colorField='Color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' displayName="2 Weeks" interval={2}/>
                                <ViewDirective option='TimelineDay' allowVirtualScrolling={true}/>
                                <ViewDirective option='TimelineWeek' displayName='2 TimelineWeeks' interval={2} />
                                <ViewDirective option='TimelineMonth' />
                            </ViewsDirective>
                            <Inject services={
                                [Day,Week, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                        <table class="cuz-table">
                         <tbody></tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>);
    }
}