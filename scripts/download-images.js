import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(destPath));
        });
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

// Curated high quality, copyright-free photography from Unsplash
const images = [
  // ── OpenGraph / Brand ───────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=630&auto=format&fit=crop&q=85',
    dest: 'public/assets/og-image.jpg',
  },

  // ── Project 1: villa-banjara ────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/villa-banjara/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/villa-banjara/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/villa-banjara/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/villa-banjara/overview.webp',
  },

  // ── Project 2: factory-nacharam ─────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/factory-nacharam/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/factory-nacharam/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/factory-nacharam/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/factory-nacharam/overview.webp',
  },

  // ── Project 3: retail-ameerpet ──────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/retail-ameerpet/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/retail-ameerpet/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/retail-ameerpet/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/retail-ameerpet/overview.webp',
  },

  // ── Project 4: apartment-gachibowli ─────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/apartment-gachibowli/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/apartment-gachibowli/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/apartment-gachibowli/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/apartment-gachibowli/overview.webp',
  },

  // ── Project 5: school-kompally ──────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/school-kompally/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/school-kompally/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/school-kompally/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/school-kompally/overview.webp',
  },

  // ── Project 6: office-hitech ────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/office-hitech/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/office-hitech/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/office-hitech/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/office-hitech/overview.webp',
  },

  // ── Project 7: warehouse-uppal ──────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/warehouse-uppal/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/warehouse-uppal/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/warehouse-uppal/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/warehouse-uppal/overview.webp',
  },

  // ── Project 8: hospital-jubilee ─────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/hospital-jubilee/exterior.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/hospital-jubilee/camera-mount.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/hospital-jubilee/nvr-rack.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=1067&auto=format&fit=crop&q=80',
    dest: 'public/images/projects/hospital-jubilee/overview.webp',
  },

  // ── Key Services ────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/home-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/office-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/factory-cctv-surveillance.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/warehouse-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/apartment-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/villa-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/retail-shop-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/school-college-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/hospital-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/hotel-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/ip-camera-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/wireless-cctv-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/ptz-camera-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/access-control-systems.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/biometric-attendance-systems.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/video-door-phone-installation.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/commercial-lan-cabling-networking.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/solar-cctv-systems.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/cctv-amc-maintenance.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/services/cctv-repair-troubleshooting.webp',
  },

  // ── Company / About ─────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/company/cctv-field-team.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/company/cctv-control-room.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/company/cctv-tools.webp',
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&auto=format&fit=crop&q=80',
    dest: 'public/images/company/office-mallapur.webp',
  },
];

async function main() {
  console.log(`Starting download of ${images.length} images...`);
  let success = 0;
  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    try {
      await downloadImage(item.url, item.dest);
      success++;
      console.log(`[${success}/${images.length}] Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`Failed to download ${item.dest}:`, err.message);
    }
  }
  console.log(`Finished! Successfully downloaded ${success}/${images.length} images.`);
}

main();
