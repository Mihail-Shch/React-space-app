import React from 'react'
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function AsteroidPageTable({ info }) {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Approach date</Table.HeaderCell>
                    <Table.HeaderCell>Velocity</Table.HeaderCell>
                    <Table.HeaderCell>Approach time</Table.HeaderCell>
                    <Table.HeaderCell>Distance</Table.HeaderCell>
                    <Table.HeaderCell>Orbiting Body</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    info.map((item, index) => {
                        return (
                            <Table.Row key={`${item.close_approach_date} + ${index}`}>
                                <Table.Cell>{item.close_approach_date}</Table.Cell>
                                <Table.Cell>{Math.round(item.relative_velocity.kilometers_per_hour)} km/h</Table.Cell>
                                <Table.Cell>{item.close_approach_date_full}</Table.Cell>
                                <Table.Cell>{Math.round(item.miss_distance.kilometers)} km</Table.Cell>
                                <Table.Cell>{item.orbiting_body}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}

export default AsteroidPageTable
