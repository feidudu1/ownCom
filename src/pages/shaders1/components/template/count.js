// 球面随机取点
function getPointRandom(radius, num) {
  const pointArr = [];
  for (let i = 0; i < num; i++) {
    const n1 = Math.random() * (1 + 1) - 1,
      n2 = Math.random() * (1 + 1) - 1;
    if ((n1 ** 2) + (n2 ** 2) < 1) {
      const posX = 2 * n1 * Math.sqrt(1 - (n1 ** 2) - (n2 ** 2)),
        posY = 2 * n2 * Math.sqrt(1 - (n1 ** 2) - (n2 ** 2)),
        posZ = 1 - 2 * ((n1 ** 2) + (n2 ** 2))
      pointArr.push({
        x: posX * radius,
        y: posY * radius,
        z: posZ * radius
      });
    }
  }
  return pointArr
}
export {
  getPointRandom
}
