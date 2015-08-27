module.exports = {
  isSiblingOf: isSiblingOf,
}


function isSiblingOf(node, testNode){
  var result = false
  var siblings = getSiblings(node)
  siblings.forEach(function(sibling){
    if( sibling === testNode ){
      result = true
    }
  })
  return result
}

function getChildren(node, skipMe){
  var children = []
  for ( ; node; node = node.nextSibling ) {
    if ( node.nodeType == 1 && node != skipMe){
      children.push( node )
    }
  }
  return children
}

function getSiblings(node) {
  return getChildren(node.parentNode.firstChild, node)
}
