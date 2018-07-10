function BinaryTree() {
  function Node(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  this.root = null
  this.insert = function (key) {
    var node = new Node(key)
    if (this.root === null) {
      this.root = node
    } else {
      insertNode(this.root, node)
    }
  }

  function insertNode(root, node) {

    if (node.key < root.key) {
      if (root.left === null) {
        root.left = node
      } else {
        insertNode(root.left, node)
      }
    } else {
      if (root.right === null) {
        root.right = node
      } else {
        insertNode(root.right, node)
      }
    }
  }

  // 中序遍历 先左节点 -> 父节点 => 右节点
  this.LDR = function (callback) {
    walkLDR(this.root, callback)
  }

  function walkLDR(node, callback) {
    if (node !== null) {
      walkLDR(node.left, callback)
      callback(node.key)
      walkLDR(node.right, callback)
    }
  }

  // 前序遍历 先父节点 -> 左节点 => 右节点
  this.DLR = function (callback) {
    walkDLR(this.root, callback)
  }

  function walkDLR(node, callback) {
    if (node !== null) {
      callback(node.key)
      walkDLR(node.left, callback)
      walkDLR(node.right, callback)
    }
  }

  // 后序遍历 先左节点 => 右节点 -> 父节点
  this.LRD = function (callback) {
    walkLRD(this.root, callback)
  }

  function walkLRD(node, callback) {
    if (node !== null) {
      walkLRD(node.left, callback)
      walkLRD(node.right, callback)
      callback(node.key)
    }
  }
}

var bt = new BinaryTree()
var nodes = [1, 3, 8, 2, 5, 13, 10]
nodes.forEach(item => bt.insert(item))
console.log(bt)
bt.LDR((key) => console.log(key))
console.log()
bt.DLR((key) => console.log(key))
console.log()
bt.LRD((key) => console.log(key))
