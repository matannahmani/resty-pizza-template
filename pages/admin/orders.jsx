import {Table,Text,Button,Grid,Card,useToasts} from '@geist-ui/react';
const Orders = () => {
    const operation = (actions, rowData) => {
        return <Button type="error" auto size="mini" onClick={() => actions.remove()}>Remove</Button>
      }
      const data = [
        { property: 'type', description: 'Content type', operation },
        { property: 'Component', description: 'DOM element to use', operation },
        { property: <Text b>bold</Text>, description: 'Bold style', operation },
      ]
      return (
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
        <Table data={data}>
          <Table.Column prop="Name" label="name" />
          <Table.Column prop="Address" label="address" />
          <Table.Column prop="order" label="order" />
          <Table.Column prop="time" label="time" />
          <Table.Column prop="operation" label="operation" width={150} />
        </Table>
        </Card>
        </Grid>
        </Grid.Container>
      )
}
export default Orders;