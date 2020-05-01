import React, { useState, useEffect } from 'react'
import { openSession } from '../QlikConnector/enigmaApp'
import LineChart from '../d3/LineChart'


const QlikObject = ({children}) => {

    const [model, setModel] = useState([])
    const objectId = 'JcJvj'

    useEffect(() => {
        const init = async () => {
            const qDoc = await openSession()
            const qObject = await qDoc.getObject(objectId)
            const properties = await qObject.getProperties()
            const newModel = await qDoc.createSessionObject(properties)
            const layout = await newModel.getLayout()
     
            const { qMatrix } = layout.qHyperCube.qDataPages[0]
            const data = qMatrix.map(([food, amount]) => ({dimension: food.qText, measure: amount.qNum}))

            setModel(data)
        }
        init()
    }, [])

    return model ?
        <div>
           <LineChart data={model} />
        </div>
        : null
}

export default QlikObject;
 