import React, {Component} from 'react';
import TableauReport from 'tableau-react';
 

class Report extends Component{
    render(){
        return(
            <div>
                <TableauReport
                    url="https://public.tableau.com/shared/FD9396NMW?:display_count=y&:origin=viz_share_link"
                />                    
             </div>
        )
    }
}
export default Report;