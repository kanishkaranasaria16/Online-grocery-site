import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const DASHBOARDBOX = (props) => {
    return (
        <div className='dashboardbox' style={{
            backgroundImage:`linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            {
                props.grow === true ?
                <span className='chart'><TrendingUpIcon/></span>
                :
                <span className='chart'><TrendingDownIcon/></span>
            }
            <div className='d-flex w-100'>
                <div className='col1'>
                    {/* Use label prop instead of hardcoded "TOTAL USER" */}
                    <h4 className='text-white'>{props.label}</h4>
                    <span className='text-white'> 277</span>
                </div>
                <div className='ml-auto'>
                    {
                        props.icon ?
                        <span className='icon'>
                            {props.icon ? props.icon : ' '}
                        </span>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    )
}

export default DASHBOARDBOX
