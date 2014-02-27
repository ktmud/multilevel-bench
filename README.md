# multilevel-bench

Benchmark suite for leveldb, multilevel, [ssdb](https://github.com/ideawu/ssdb), redis

```bash
git clone <this repo>
npm install
redis-server
ssdb-server ./ssdb.conf
memcached
npm run bench
```

## About SSDB 

[ssdb](https://github.com/ideawu/ssdb) is a redis protocol compatible NoSQL database
based on leveldb. Much like what `multilevel` does, but written in C++.

## Results

```

                      Redis (100.000x)
          13,607 op/s ⨠ set small
          13,270 op/s ⨠ set medium
          12,872 op/s ⨠ set large
          13,335 op/s ⨠ get large
          13,391 op/s ⨠ get medium
          13,859 op/s ⨠ get small

                      SSDB (100.000x)
          12,115 op/s ⨠ set small
          11,378 op/s ⨠ set medium
          11,370 op/s ⨠ set large
          12,915 op/s ⨠ get large
          12,615 op/s ⨠ get medium
          12,004 op/s ⨠ get small

                      levelUP (100.000x)
          30,658 op/s ⨠ set small
          16,354 op/s ⨠ set medium
          16,260 op/s ⨠ set large
          13,232 op/s ⨠ get large
          13,206 op/s ⨠ get medium
          27,827 op/s ⨠ get small

                      levelDOWN (100.000x)
          53,211 op/s ⨠ set small
          46,330 op/s ⨠ set medium
          39,564 op/s ⨠ set large
          42,163 op/s ⨠ get large
          46,262 op/s ⨠ get medium
          41,021 op/s ⨠ get small

                      multilevel (100.000x)
           6,044 op/s ⨠ set small
           5,760 op/s ⨠ set medium
           5,590 op/s ⨠ set large
           5,637 op/s ⨠ get large
           5,888 op/s ⨠ get medium
           6,191 op/s ⨠ get small

                      multilevel (standalone server process, 100.000x)
           5,716 op/s ⨠ set small
           5,535 op/s ⨠ set medium
           5,204 op/s ⨠ set large
           5,218 op/s ⨠ get large
           5,468 op/s ⨠ get medium
           5,569 op/s ⨠ get small

                      MemDOWN (10.000x)
         120,676 op/s ⨠ set small
          91,487 op/s ⨠ set medium
          29,529 op/s ⨠ set large
         170,717 op/s ⨠ get large
         159,736 op/s ⨠ get medium
         168,742 op/s ⨠ get small

                      Memory (100.000x)
      38,747,645 op/s ⨠ set small
      12,055,305 op/s ⨠ set medium
      10,656,012 op/s ⨠ set large
      53,833,627 op/s ⨠ get small
      52,238,962 op/s ⨠ get medium
      72,521,575 op/s ⨠ get large


  Suites:  8
  Benches: 48
  Elapsed: 361,914.28 ms

```
