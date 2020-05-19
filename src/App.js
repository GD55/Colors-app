import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from "./Page";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    }
  }

  findPallete = (id) => {
    return this.state.palettes.find(palette => palette.id === id);
  }

  deletePalette = (id) => {
    this.setState({
      palettes: this.state.palettes.filter((palette) => palette.id !== id)
    },
      this.syncLocalSStorage
    )
  }

  savePalette = (newPalette) => {
    this.setState({ palettes: [...this.state.palettes, newPalette] },
      this.syncLocalSStorage
    );
  }

  syncLocalSStorage = () => {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/'
                render={(routeProps) =>
                  <Page>
                    <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />
                  </Page>
                } />
              <Route
                exact
                path='/palette/new'
                render={(routeProps) =>
                  <Page>
                    <NewPaletteForm
                      palettes={this.state.palettes}
                      savePalette={this.savePalette}
                      {...routeProps}
                    />
                  </Page>
                } />
              <Route
                exact
                path='/palette/:id'
                render={routeprops =>
                  <Page>
                    <Palette palette={generatePalette(this.findPallete(routeprops.match.params.id))} />
                  </Page>
                } />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeprops =>
                  <Page>
                    <SingleColorPalette
                      colorId={routeprops.match.params.colorId}
                      palette={generatePalette(this.findPallete(routeprops.match.params.paletteId))}
                    />
                  </Page>
                } />
              <Route
                render={(routeProps) =>
                  <Page>
                    <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />
                  </Page>
                } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }
}

export default App;