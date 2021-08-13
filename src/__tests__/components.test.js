import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { App } from '../App';
import Plot from 'react-plotly.js';

// How to test React components developed using React-Plotly
// https://github.com/plotly/react-plotly.js/issues/176

describe.skip('components', function() {
    describe('<App />', function() {
        it('renders correctly', function() {
            var tree = renderer.create(<App redux={fromJS({})} />).toJSON();
          expect(tree).toMatchSnapshot();
        });
    });
});

