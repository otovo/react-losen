// @flow
import { type Node, Component } from 'react';
import log from 'loglevel';

export type StepProps = {
  children: Node,
  name: string,
};

type State = {
  isActive: boolean,
};

class StepWrapper extends Component<StepProps, State> {
  static displayName = 'StepWrapper';

  state = {
    isActive: false,
  };

  componentDidMount() {
    log.debug(this.props.name, 'has mounted');
  }

  render() {
    const { name, children } = this.props;

    // if (!this.state.isActive) {
    //   return null;
    // }

    log.debug(name, 'is rendering');
    return children;
  }
}

export default StepWrapper;
