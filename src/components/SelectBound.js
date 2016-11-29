import { connect } from 'react-redux'
import Bound from './Bound'
import { selectBound } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const SelectBound = connect(
  mapStateToProps,
  { onBoundChange: selectBound }
)(Bound)

export default SelectBound
