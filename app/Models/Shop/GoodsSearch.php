<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsSearch extends Model {
    protected $table = 'shop_goods_search';
    public $timestamps = false;
    protected $guarded = [];

    public function goods() {           return $this->belongsTo(Goods::class, 'gd_id'); }
    public function goodsModelPrime() { return $this->hasOne(GoodsModel::class, "gm_gd_id", 'gd_id')->Prime(); }
    public function scopeEnable($q, $v)             { return $q->where('gd_enable', $v); }


    protected function runPaginationCountQuery($columns = ['*']) {
        dd(123);
        if ($this->groups || $this->havings) {
            $clone = $this->cloneForPaginationCount();

            if (is_null($clone->columns) && ! empty($this->joins)) {
                $clone->select($this->from.'.*');
            }

            return $this->newQuery()
                ->from(new Expression('('.$clone->toSql().') as '.$this->grammar->wrap('aggregate_table')))
                ->mergeBindings($clone)
                ->setAggregate('count', $this->withoutSelectAliases($columns))
                ->get()->all();
        }

        $without = $this->unions ? ['orders', 'limit', 'offset'] : ['columns', 'orders', 'limit', 'offset'];

        return $this->cloneWithout($without)
                    ->cloneWithoutBindings($this->unions ? ['order'] : ['select', 'order'])
                    ->setAggregate('count', $this->withoutSelectAliases($columns))
                    ->get()->all();
    }
}
