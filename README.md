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
          13,787 op/s ⨠ set small
          13,784 op/s ⨠ set medium
          13,534 op/s ⨠ set large
          13,299 op/s ⨠ get large
          13,579 op/s ⨠ get medium
          14,449 op/s ⨠ get small

                      SSDB (100.000x)
          12,371 op/s ⨠ set small
          12,195 op/s ⨠ set medium
          11,684 op/s ⨠ set large
          13,435 op/s ⨠ get large
          13,475 op/s ⨠ get medium
          11,832 op/s ⨠ get small

                      levelUP (100.000x)
          34,980 op/s ⨠ set small
          16,784 op/s ⨠ set medium
          16,706 op/s ⨠ set large
          13,248 op/s ⨠ get large
          13,232 op/s ⨠ get medium
          33,390 op/s ⨠ get small

                      levelDOWN (100.000x)
          56,404 op/s ⨠ set small
          54,052 op/s ⨠ set medium
          49,975 op/s ⨠ set large
          46,614 op/s ⨠ get large
          46,915 op/s ⨠ get medium
          42,928 op/s ⨠ get small

                      lmdb (100.000x)
           4,790 op/s ⨠ set small
          14,448 op/s ⨠ set medium
          31,937 op/s ⨠ set large
          44,661 op/s ⨠ get large
          47,143 op/s ⨠ get medium
          54,999 op/s ⨠ get small

                      levelup lmdb (100.000x)
           4,241 op/s ⨠ set small
          10,946 op/s ⨠ set medium
          17,047 op/s ⨠ set large
          13,550 op/s ⨠ get large
          15,736 op/s ⨠ get medium
          50,295 op/s ⨠ get small

                      multilevel (100.000x)
           6,089 op/s ⨠ set small
           6,025 op/s ⨠ set medium
           5,941 op/s ⨠ set large
           6,039 op/s ⨠ get large
           6,038 op/s ⨠ get medium
           6,273 op/s ⨠ get small

                      multilevel (standalone server process, 100.000x)
           5,731 op/s ⨠ set small
           5,674 op/s ⨠ set medium
           5,544 op/s ⨠ set large
           5,569 op/s ⨠ get large
           5,614 op/s ⨠ get medium
           5,652 op/s ⨠ get small

                      MemDOWN (10.000x)
         122,620 op/s ⨠ set small
          82,145 op/s ⨠ set medium
          48,999 op/s ⨠ set large
         156,435 op/s ⨠ get large
         167,715 op/s ⨠ get medium
         180,076 op/s ⨠ get small

                      Memory (100.000x)
      18,422,432 op/s ⨠ set small
      14,235,676 op/s ⨠ set medium
      10,642,416 op/s ⨠ set large
      79,585,455 op/s ⨠ get small
      76,101,647 op/s ⨠ get medium
      51,492,113 op/s ⨠ get large


  Suites:  10
  Benches: 60
  Elapsed: 441,947.35 ms

```
