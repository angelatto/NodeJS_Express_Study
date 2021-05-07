const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    // 1. 모델 클래스 선언 
    class Product extends Model{
        static associate(models){ // 파라미터로 db 객체가 들어옴 
            models.Product.hasMany(models.OrderItem, {foreignKey:"pid", sourceKey:"pid"});
        }
    }

    // 2. 컬럼 정의/모델명/테이블명 결정 
    // init은 정적 메소드이다. 
    Product.init({
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: false
    });

    // 3. 모델 클래스 리턴 
    return Product;
};