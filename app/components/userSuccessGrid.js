import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'https://images.pexels.com/photos/397096/pexels-photo-397096.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
    title: 'Stroll in my backyard.',
    link: "http://www.google.com",
  },
  {
    img: 'https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    title: 'My best friends.',
    link: "http://www.google.com",   
  },
  {
    img: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    title: 'Delicious breakfast.',
    link: "http://www.google.com",
  },
  {
    img: 'https://images.pexels.com/photos/219014/pexels-photo-219014.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
    title: 'Morning Commute.',
    link: "http://www.google.com",
    featured: false,
  },
];

/**
 * This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile.
 * The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.
 */
const GridListExampleComplex = () => (
  <div style={styles.root}>
    <GridList
      cols={2}
      cellHeight={200}
      padding={1}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
          href={tile.link}
        >      
          <img src={tile.img} />

        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleComplex;