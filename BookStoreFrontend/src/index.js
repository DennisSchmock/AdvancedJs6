import React from 'react'
import { render } from 'react-dom'
import './components/css/style.css'
import RouterComponent from './components/RouterComponent'

import BookStore from './models/BookStore'


window.React = React

render(
<div>
    <RouterComponent bookStore={BookStore}/>
</div>
    ,

      document.getElementById('reactor-container')
)