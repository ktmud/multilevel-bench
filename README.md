# multilevel-bench

Benchmark suite for leveldb, multilevel, redis,
 [lmdb](https://github.com/rvagg/lmdb/), [ssdb](https://github.com/ideawu/ssdb).

Forked from [juliangruber/multilevel-bench](https://github.com/juliangruber/multilevel-bench).


```bash
git clone <this repo>
npm install
redis-server
ssdb-server ./ssdb.conf
memcached
npm run bench
```

## What is SSDB?

[SSDB](https://github.com/ideawu/ssdb) is a redis protocol compatible NoSQL database
based on leveldb. Much like what `multilevel` does, but written in C++.

## Results

Current results from my machine (MBP Retina, i5, 16GB Ram, SSD):

```

                      Redis (100.000x)
          13,540 op/s ⨠ set small
          13,289 op/s ⨠ set medium
          13,279 op/s ⨠ set large
          13,651 op/s ⨠ get large
          13,681 op/s ⨠ get medium
          14,428 op/s ⨠ get small

                      SSDB (100.000x)
          12,252 op/s ⨠ set small
          11,824 op/s ⨠ set medium
          11,720 op/s ⨠ set large
          13,810 op/s ⨠ get large
          13,593 op/s ⨠ get medium
          12,696 op/s ⨠ get small

                      levelUP (100.000x)
          34,364 op/s ⨠ set small
          16,860 op/s ⨠ set medium
          16,874 op/s ⨠ set large
          13,360 op/s ⨠ get large
          13,326 op/s ⨠ get medium
          32,920 op/s ⨠ get small

                      levelDOWN (100.000x)
          54,255 op/s ⨠ set small
          52,183 op/s ⨠ set medium
          49,177 op/s ⨠ set large
          45,591 op/s ⨠ get large
          46,551 op/s ⨠ get medium
          41,218 op/s ⨠ get small

                      lmdb (100.000x)
           4,616 op/s ⨠ set small
          11,104 op/s ⨠ set medium
          17,283 op/s ⨠ set large
          13,778 op/s ⨠ get large
          16,002 op/s ⨠ get medium
          50,562 op/s ⨠ get small

                      multilevel (100.000x)
           6,124 op/s ⨠ set small
           5,900 op/s ⨠ set medium
           5,944 op/s ⨠ set large
           6,215 op/s ⨠ get large
           6,125 op/s ⨠ get medium
           6,310 op/s ⨠ get small

                      multilevel (standalone server process, 100.000x)
           5,680 op/s ⨠ set small
           5,652 op/s ⨠ set medium
           5,533 op/s ⨠ set large
           5,531 op/s ⨠ get large
           5,488 op/s ⨠ get medium
           5,601 op/s ⨠ get small

                      MemDOWN (10.000x)
         136,862 op/s ⨠ set small
          97,898 op/s ⨠ set medium
          94,854 op/s ⨠ set large
         151,099 op/s ⨠ get large
         166,688 op/s ⨠ get medium
         164,227 op/s ⨠ get small

                      Memory (100.000x)
      33,733,571 op/s ⨠ set small
       9,853,149 op/s ⨠ set medium
      11,721,209 op/s ⨠ set large
      82,267,489 op/s ⨠ get small
      52,437,917 op/s ⨠ get medium
      73,014,872 op/s ⨠ get large


  Suites:  9
  Benches: 54
  Elapsed: 402,294.08 ms

```
