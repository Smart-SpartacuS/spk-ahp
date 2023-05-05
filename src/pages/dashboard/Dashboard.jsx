/** @format */

import React from "react";
import dekomposisi from "../../assets/dekomposisi.png";

const Dashboard = () => {
  return (
    <div className="w-full mb-[10%]">
      <article className="prose prose-xl max-w-none">
        <h2 className="text-center">Selamat datang</h2>
        <h4 className="text-center">Website Perhitungan SPK metode AHP</h4>
        <div>
          <h4>
            <span className="mr-2">1.</span>
            <span>Dekomposisi</span>
          </h4>
          <div className="not-prose ml-7">
            <img src={dekomposisi} alt="" />
          </div>
        </div>
        <div>
          <h4>
            <span className="mr-2">2.</span>
            <span>Perbandingan penilaian/pertimbangan</span>
          </h4>
          <div className="not-prose ml-7">
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>Tingkat</th>
                    <th>Definisi</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td className="whitespace-normal">
                      Kedua elemen sama pentingnya
                    </td>
                    <td className="whitespace-normal">
                      Kedua elemen mempunyai pengaruh yang sama
                    </td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td className="whitespace-normal">
                      Elemen yang satu sedikit lebih penting dibanding yang lain
                    </td>
                    <td className="whitespace-normal">
                      Pengalaman dan pertimbangan sedikit menyokong satu elemen
                      dibandingkan yang lain
                    </td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td className="whitespace-normal">
                      Elemen yang satu sangat penting dibandingkan elemen yang
                      satu lagi
                    </td>
                    <td className="whitespace-normal">
                      Pengalaman dan pertimbangan kuat menyokong satu elemen
                      dibandingkan yang lain
                    </td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td className="whitespace-normal">
                      Elemen yang satu jelas lebih penting dibanding yang lain
                    </td>
                    <td className="whitespace-normal">
                      Satu elemen sangat berpengaruh dan terlihat dominan
                    </td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <td className="whitespace-normal">
                      Satu elemen mutlak lebih penting daripada yang lain
                    </td>
                    <td className="whitespace-normal">
                      Bukti bahwa elemen yang satu lebih penting daripada yang
                      lain sangat jelas
                    </td>
                  </tr>
                  <tr>
                    <th>2,4,6,8</th>
                    <td className="whitespace-normal">
                      Nilai tengah diantara dua pertimbangan yang berdekatan
                    </td>
                    <td className="whitespace-normal">
                      Nilai ini diberikan jika terdapat keraguan diantara dua
                      penilaian
                    </td>
                  </tr>
                  <tr>
                    <th>Kebalikan</th>
                    <td className="whitespace-normal">
                      Jika suatu aktivitas i mendapat satu angka bila
                      dibandingkan dengan aktivitas j, maka j mempunyai nilai
                      kebalikannya bila dibandingkan dengan i
                    </td>
                    <td className="whitespace-normal"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h4>
            <span className="mr-2">3.</span>
            <span>Consistency Ratio</span>
          </h4>
          <div className="not-prose ml-7">
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>IR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.58</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>0.9</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>1.12</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>1.24</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>1.32</td>
                  </tr>
                  <tr>
                    <th>8</th>
                    <td>1.41</td>
                  </tr>
                  <tr>
                    <th>9</th>
                    <td>1.45</td>
                  </tr>
                  <tr>
                    <th>10</th>
                    <td>1.49</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Dashboard;
