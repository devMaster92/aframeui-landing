// Function to change Opacity of Aframe Components (DO NOT CHANGE)

function allDescendants(node) {
  for (var i = 0; i < node.childElementCount; i++) {
    var child = node.childNodes[i];
    allDescendants(child);
    changeOpacity(child);
  }
}

function changeOpacity(child) {
  let delta = 0.005;
  if (child.hasAttribute("material")) {
    let mat = child.getAttribute("material");
    let opacityInterval = setInterval(() => {
      if (mat) {
        mat.opacity -= delta * 1.7;
        child.setAttribute("material", mat);
        if (mat.opacity < 0) {
          clearInterval(opacityInterval);
        }
      }
    }, 100);
  } else if (child.getObject3D("mesh")) {
    var delta2 = 0.001;
    if (child.getAttribute("id") === "model_front") {
      delta2 = 0.005;
    }

    var mesh = child.getObject3D("mesh");
    // console.log('child', child)
    // console.log('mesh', child.getObject3D('mesh'))
    if (!mesh) {
      return;
    }
    let opacityInterval3D = setInterval(() => {
      mesh.traverse(function(node) {
        if (node.isMesh) {
          node.material.opacity -= delta2;
          node.material.transparent = true;
          node.material.needsUpdate = true;
          if (node.material.opacity < 0) {
            clearInterval(opacityInterval3D);
            if (child.parentNode) {
              child.parentNode.removeChild(child);
              // console.log('Child removed')
            }
          }
        }
      });
    }, 100);
  }
}
export default {
  allDescendants: allDescendants
};
