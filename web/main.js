;(function () {

    var fMap = {
        0: '默认版式',
        1: '数码平铺',
        2: '数码堆叠',
        3: '胶印平铺',
        5: '胶印翻滚',
        6: '胶印左右翻',
    };

    console.log(calc(100, 100, 2, 7, 6, 0, 1));

    function calc (Sn, Pn, Gn, M, Bn, F, N, S, Yn) {

        /**
         * Sn: SKU容量, Pn: 款数量, Gn: 构件数量, M: 模数, Bn: 版数, F: 版式, N: 第几版, S: 工艺面, Yn: 余数
         *
         */

        var result = {
            clicks: 0,//每版印数
            material_clicks: 0,//材料数量
            Yn: 0,//剩余数量

        };

        switch (F) {
            case 0:

                //向上取整
                result['clicks'] = Math.ceil(Gn * Pn * Sn / M);
                result['material_clicks'] = Math.ceil(Gn * Pn * Sn / M);

                break;
            case 1:

                if (N == 1) {
                    Bn = Gn;

                    //向下取整
                    var clicks = Math.floor(Pn * Sn / M);
                    if (clicks == 0) {
                        F = 2;
                        calc(Sn, Pn, Gn, M, Bn, F, N, S, Yn);
                    } else {
                        result['clicks'] = clicks;
                        result['material_clicks'] = clicks * Bn;
                    }

                    Yn = Pn * Sn - M * Math.floor(Pn * Sn / M);
                    if (Yn > 0) {
                        //TODO 添加版式: 数码堆叠, 添加后再次执行calc进行计算
                    }
                }

                break;
            case 2:

                if (N == 1) {
                    Bn = Math.ceil(Gn * Pn * Sn / M) * S;

                    result['clicks'] = 1;
                    result['material_clicks'] = Bn;
                } else if (N == 2) {
                    Bn = Math.ceil(Pn * Sn - M * Math.floor(Pn * Sn /M) * Gn /M) * S;

                    result['click'] = 1;
                    result['material_clicks'] = Bn;
                }

                break;
            case 3:

                if (N == 1) {

                    var val = Math.floor(Gn / M);
                    if (val == 0) {
                        Bn = S;

                        result['click'] = Pn * Sn / Math.floor(M / Gn);
                        result['material_clicks'] = Pn * Sn / Math.floor(M / Gn);
                    } else {
                        Bn = val * S;
                        Yn = Gn - Math.floor(Gn / M) * M;

                        result['click'] = Pn * Sn;
                        result['material_clicks'] = Math.floor(Gn / M) * Pn * Sn;

                        if (Yn > 0) {
                            //TODO 添加版式, 添加后再次执行calc进行计算
                        }

                    }
                }

                break;
            case 5:
            case 6:
                if (N == 1) {
                    if (S == 1) {
                        F = 3;
                        calc(Sn, Pn, Gn, M, Bn, F, N, S, Yn);
                    } else {
                        if (Gn <= M) {
                            Yn = Gn - Math.floor(Gn / M) * M;

                            result['click'] = Pn * Sn / Math.floor(M / Gn) * S;

                            if (Yn > 0) {
                                //TODO 添加版式, 添加后再次执行calc进行计算
                            }
                        } else {
                            Yn = Gn - M;

                            result['click'] = Pn * Sn * 2;

                            if (Yn > 0) {
                                //TODO 添加版式, 添加后再次执行calc进行计算
                            }
                        }
                        result['material_clicks'] = Pn * Sn / Math.floor(M / Gn);
                    }
                }

                break;
            case 7:

                result['click'] = Math.ceil(Pn * Sn / M);

                var length = 10;
                result['material_clicks'] = length * Math.ceil(Pn * Sn / M) / 1000;

                break;
        }


        return result;
    }

})(window);
