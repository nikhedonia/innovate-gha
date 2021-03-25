import React from 'react';
import { Box } from "@material-ui/core";
import { useGetOrgsQuery } from './graphql';

type Org = {
    avatarUrl: string | null | undefined; 
    name: string | null | undefined;
  }
  interface OrgPickerProps {
    onLoad(x: Org):void
  }
  
export default function OrgPicker({onLoad}: OrgPickerProps) {
  const { data } = useGetOrgsQuery();
  const [selected, setSelected] = useState<string>('');

  if(!data)
    return null;

  return (
    <Box>
      <h1>Choose an Org</h1>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}>{
        (data
          .viewer
          ?.organizations?.nodes ||[])
        .map( (x, i) => (
          <button
          key={x?.name || i}  
            onClick={()=>{
              onLoad(x as Org);
              console.log('selected', x);
              setSelected(x!.name || '');
            }}
            style={{
              border:
                (selected === x?.name) 
                  ? 'solid 1px blue'
                  : 'none',
              }}
          > 
            <img src={x?.avatarUrl || ''} style={{width: '2em', height: '2em'}}  />
            <span>{x?.name || ''}</span>
          </button>
        ))
      }</Grid>
    </Box>
  )

}